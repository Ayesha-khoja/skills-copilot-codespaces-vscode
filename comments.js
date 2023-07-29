// Create web server
// Created: 06/15/2021 11:00 PM
// -----------------------------------

// -----------------------------------
// Imports
// -----------------------------------
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// -----------------------------------
// Create comment
// api/comments
// -----------------------------------
router.post(
  '/',
  auth,
  [check('comment', 'Comment is required').not().isEmpty()],
  commentController.createComment
);

// -----------------------------------
// Get comments by project
// api/comments
// -----------------------------------
router.get('/', auth, commentController.getCommentsByProject);

// -----------------------------------
// Update comment
// api/comments/:id
// -----------------------------------
router.put('/:id', auth, commentController.updateComment);

// -----------------------------------
// Delete comment
// api/comments/:id
// -----------------------------------
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;