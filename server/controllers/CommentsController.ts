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
    const {userId, hotelId, comment} = req.body;
    let caddedComment = await CommentsService.addComment(userId, hotelId, comment);
    res.status(200).send(caddedComment);
  };

  public async deleteComment(req : Request, res : Response, next : NextFunction)  {
      //REMIND KRIS THAT AN USER CAN DELETE ONLY HIS COMMENTS
    let id = parseInt(req.params.id);
    let deletedComment = await CommentsService.deleteComment(id);
    res.status(200).send(deletedComment);
  };

  public async allCommentsForHotel(req : Request, res : Response, next : NextFunction)  {
    let hotelId = parseInt(req.params.id);
    let comments = await CommentService.getAllCommentsForHotel(hotelId);
    res.status(200).send(comments);
  };

  public async toggleReactThumb(req : Request, res : Response, next : NextFunction)  {
    const {userId, commentId} = req.body;
    if(await (CommentService.isUserReactedThumb(commentId, userId)) === true){
        await CommentService.deleteReact(commentId, userId, Reacts.THUMB);
        res.send("ThumbRemoved")
    }
    else{
        await CommentService.addReact(commentId, userId, Reacts.THUMB);
        res.send("ThumbAdded");
    }
    
  };


  public async toggleReactParty(req : Request, res : Response, next : NextFunction)  {
    const {userId, commentId} = req.body;
    if(await (CommentService.isUserReactedParty(commentId, userId)) === true){
        await CommentService.deleteReact(commentId, userId, Reacts.PARTY);
        res.send("PartyRemoved")
    }
    else{
        await CommentService.addReact(commentId, userId, Reacts.PARTY);
        res.send("PartyAdded")
    }
  };


  public async editComment(req : Request, res : Response, next : NextFunction)  {
    //Krish should know that a user can edit only his own comment
    let commentId = parseInt(req.params.id);
    const {newComment} = req.body;
    let editComment = await CommentService.editComment(commentId, newComment);
    res.status(200).send(editComment);
  };
  
 
}

export default CommentsController.getInstance();




