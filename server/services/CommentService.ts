import { _objectWithoutProperties } from "../helperFunctions/deleteObjectKeys";
import { Comment } from "../models/Comment";
import {Reacts} from '../constants/Reacts'
import { CommentReacts } from "../models/CommentReacts";
import { Not } from "typeorm/find-options/operator/Not";
import { DeleteResult, UpdateResult } from "typeorm";


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

        const commentReact = await CommentReacts.findOne({where: {commentId, userId, thumbReact : Not(null)}}); 
        if(commentReact != undefined){
            return true;
        }   
        else{
            return false;
        }
    }

    public async isUserReactedParty(commentId: number, userId : number) : Promise<Boolean>{

        const commentReact = await CommentReacts.findOne({where: {commentId, userId,  partyReact : Not(null)}}); 
        if(commentReact != undefined){
            return true;
        }   
        else{
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
            toBeDeleted = await CommentReacts.findOne({where:{commentId, userId, thumbReact: Not(null)}})
        }
        else{
            toBeDeleted = await CommentReacts.findOne({where:{commentId, userId, partyReact: Not(null)}})
        
        }
         
        return await CommentReacts.delete(toBeDeleted);
    }

    public async addComment(hotelId : number, userId: number, comment: string) : Promise<Comment>{
        const newComment = new Comment();
        newComment.hotelId = hotelId;
        newComment.userId = userId;
        newComment.comment = comment;
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