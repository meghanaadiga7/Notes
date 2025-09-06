const {endOfDay}=require("date-fns/endOfDay");
const {startOfDay}=require("date-fns/startOfDay");

class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    filter(userID){
        const queryObj={...this.queryStr,user:userID};

        if(!queryObj.date){
            queryObj.date=new Date();
        }

        queryObj.createdAt={gte: startOfDay(new Date(queryObj.date)) ,lte: endOfDay(new Date(queryObj.date))}
        delete queryObj["date"];

        const excludedFields=["page","limit","sort","fields"];
        excludedFields.forEach(el=>delete queryObj[el]);

        let queryString=JSON.stringify(queryObj);
        queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

        this.query=this.query.find(JSON.parse(queryString));

        return this;
    }

    filterNotes(enteredNoteSetID){
        const queryObj={...this.queryStr,noteSetID:enteredNoteSetID};

        const excludedFields=["page","limit","sort","fields"];
        excludedFields.forEach(el=>delete queryObj[el]);

        let queryString=JSON.stringify(queryObj);
        queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

        this.query=this.query.find(JSON.parse(queryString));

        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy=this.queryStr.sort.split(",").join(" ");
            this.query=this.query.sort(sortBy);
        }else{
            this.query=this.query.sort("createdAt");
        }
        return  this;
    }

    limit(){
        if(this.queryStr.fields){
            const fields=this.queryStr.fields.split(",").join(" ");
            this.query=this.query.select(fields);
        }else{
            this.query=this.query.select("-__v -user");
        }
        return this;
    }


    paginate(){
        const page=this.queryStr.page*1 || 1;
        const limit=this.queryStr.limit*1 || 20;
        const skip=(page-1) *limit;
        this.query=this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports=APIFeatures;