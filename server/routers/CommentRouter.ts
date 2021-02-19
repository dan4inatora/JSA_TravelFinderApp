import {CommonRoutesConfig} from './CommonRoutesConfig';
import express from 'express';
import commentController from '../controllers/CommentsController';
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware';

export class CommentRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CommentRouter');
    }

    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app.route('/addComment')
            .post(AuthenticationMiddleware.isAuthenticated,
                  commentController.addComment)
        this.app.route('/deleteComment/:id')
            .delete(AuthenticationMiddleware.isAuthenticated,
                    commentController.deleteComment)
        this.app.route('/getAllComments/:id')
            .get(AuthenticationMiddleware.isAuthenticated,
                  commentController.allCommentsForHotel)
        this.app.route('/toggleThrumbReact')
            .post(AuthenticationMiddleware.isAuthenticated,
                  commentController.toggleReactThumb)
        this.app.route('/togglePartyReact')
            .post(AuthenticationMiddleware.isAuthenticated,
                  commentController.toggleReactParty)
        this.app.route('/editComment/:id')
            .put(AuthenticationMiddleware.isAuthenticated,
                  commentController.editComment)

        return this.app;
    }
}