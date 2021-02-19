import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { Comment } from "../models/Comment";
import {Reacts} from '../constants/Reacts'
import { CommentReacts } from "../models/CommentReacts";
import { Not } from "typeorm/find-options/operator/Not";
import { DeleteResult, UpdateResult } from "typeorm";
import hotelService from "./HotelService";
import { Hotel } from "../models/Hotel";


class CommentService {

    private static instance: CommentService;

    public static getInstance(): CommentService {
        if (!CommentService.instance) {
            CommentService.instance = new CommentService();
        }

        return CommentService.instance;
    }

    public async getAllCommentsForHotel(hotelId: number) : Promise<Comment[]> {
        return await Comment.find({where:{hotelId}});
    }

    public async isUserReactedThumb(commentId: number, userId : number) : Promise<Boolean>{

        const commentReact = await CommentReacts.findOne({where: {commentId, userId, thumbReact : 1}}); 
        if(commentReact != undefined){
            return true;
        }   
        else{
            return false;
        }
    }

    public async isUserReactedParty(commentId: number, userId : number) : Promise<Boolean>{

        const commentReact = await CommentReacts.findOne({where: {commentId, userId,  partyReact : 1}}); 
        console.log("What is your value", commentReact);
        if(commentReact != undefined){
            console.log("Is it true", commentReact)
            return true;
        }   
        else{
            console.log("Is it false", commentReact)
            return false;
        }
    }

    public async addReact(commentId: number, userId : number, reactType : string) : Promise<CommentReacts>{
        const commentReact = new CommentReacts();
        commentReact.userId = userId;
        commentReact.commentId = commentId;
        if(reactType == Reacts.THUMB){
            commentReact.thumbReact = 1;
        }
        else{
            commentReact.partyReact = 1;
        }
        return await commentReact.save();
    }

    public async deleteReact(commentId: number, userId : number, reactType : string) : Promise<DeleteResult>{
        let toBeDeleted : CommentReacts = null;
        if(reactType == Reacts.THUMB){
            toBeDeleted = await CommentReacts.findOne({where:{commentId, userId, thumbReact: 1}})
        }
        else{
            toBeDeleted = await CommentReacts.findOne({where:{commentId, userId, partyReact: 1}})
        
        }
         
        return await CommentReacts.delete(toBeDeleted);
    }

    public async addComment(userId: number, hotelId : number, hotelName: string, comment: string) : Promise<Comment>{
        let hotel = await hotelService.getHotelById(hotelId);
        if(hotel == undefined){ 
            await hotelService.createHotel(hotelId, hotelName, 0)
        }
        const newComment = new Comment();
        newComment.hotelId = hotelId;
        newComment.userId = userId;
        newComment.comment = comment;
        console.log("COmment created", newComment);
        return await newComment.save();
    }

    public async deleteComment(commentId : number) : Promise<DeleteResult>{
        return await Comment.delete({id:commentId});
    }

    public async editComment(commentId : number, newComment : string) : Promise<UpdateResult>{
        return await Comment.update({id : commentId}, {comment : newComment});
    }


}

export default CommentService.getInstance();