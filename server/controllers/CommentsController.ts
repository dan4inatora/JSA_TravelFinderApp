import { Reacts } from "../constants/Reacts";
import { NextFunction, Request, Response } from "express";
import { use } from "passport";
import CommentService from "../services/CommentService";
import CommentsService from '../services/CommentService';

class CommentsController {

  private static instance: CommentsController;

  public static getInstance(): CommentsController {
      if (!CommentsController.instance) {
        CommentsController.instance = new CommentsController();
      }

      return CommentsController.instance;
  }

  public async addComment(req : Request, res : Response, next : NextFunction)  {
    const {userId, commentId, comment} = req.body;
    await CommentsService.addComment(userId, commentId, comment);
  };

  public async deleteComment(req : Request, res : Response, next : NextFunction)  {
      //REMIND KRIS THAT AN USER CAN DELETE ONLY HIS COMMENTS
    const {id} = req.body;
    await CommentsService.deleteComment(id);
  };

  public async allCommentsForHotel(req : Request, res : Response, next : NextFunction)  {
    const {hotelId} = req.body;
    await CommentService.getAllCommentsForHotel(hotelId);
  };

  public async toggleReactThumb(req : Request, res : Response, next : NextFunction)  {
    const {userId, commentId} = req.body;
    if(await (CommentService.isUserReactedThumb(commentId, userId)) === true){
        await CommentService.addReact(commentId, userId, Reacts.THUMB)
    }
    else{
        await CommentService.deleteReact(commentId, userId, Reacts.THUMB);
    }
  };


  public async toggleReactParty(req : Request, res : Response, next : NextFunction)  {
    const {userId, commentId} = req.body;
    if(await (CommentService.isUserReactedParty(commentId, userId)) === true){
        await CommentService.addReact(commentId, userId, Reacts.PARTY)
    }
    else{
        await CommentService.deleteReact(commentId, userId, Reacts.PARTY);
    }
  };


  public async editComment(req : Request, res : Response, next : NextFunction)  {
    //Krish should know that a user can edit only his own comment
    const {commentId, newComment} = req.body;
    await CommentService.editComment(commentId, newComment);
  };
  
 
}

export default CommentsController.getInstance();




