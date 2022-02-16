const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');
const commentVoteCtrl = require('../controllers/CommentVote');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const commentSchema = require('../middlewares/YupValidation/commentSchema');
const idCommentCompare = require('../middlewares/idCommentCompare');

router.get('/messages/:messageid/comments', auth, commentCtrl.getCommentByMessageId);
router.get('/comments/votes/all', auth, commentVoteCtrl.showAllCommentsLikes);

router.put('/comments/:id', auth, idCommentCompare, multer, commentSchema, commentCtrl.editComment);

router.post('/messages/:id/comments/new', auth, multer, commentSchema, commentCtrl.postComment);
router.post('/comments/:id/like', auth, commentVoteCtrl.likeComment);
router.post('/comments/:id/dislike', auth, commentVoteCtrl.dislikeComment);

router.delete('/comments/:id', auth, idCommentCompare, commentCtrl.deleteComment);
router.delete('/comments/:id/delimg', auth, idCommentCompare, commentCtrl.deleteCommentImage);

module.exports = router;