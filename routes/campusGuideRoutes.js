import express from "express";
import { Home } from "../controller/Home.js";
import {
  followClub,
  getClubFollowers,
  unfollowClub,
} from "../controller/clubfollowers.js";
import { createClub, getAllClubs } from "../controller/clubs.js";
import { createComment, getAllComments } from "../controller/comment.js";
import {
  getEvents,
  registerEvent,
  unregisterEvent,
} from "../controller/event-register.js";
import { addEvent, getEventAllEvents } from "../controller/events.js";
import { getTotalLikes, likeAndDislike } from "../controller/like.js";
import { addPost, getPosts } from "../controller/post.js";
import { createUser, getUser } from "../controller/user.js";

const router = express.Router();

router.get("/", Home);
router
  .route("/clubfollowers")
  .get(getClubFollowers)
  .post(followClub)
  .delete(unfollowClub);

router.route("/club").get(getAllClubs).post(createClub);

router.route("/comment").get(getAllComments).post(createComment);
router
  .route("/event-register")
  .get(getEvents)
  .post(registerEvent)
  .delete(unregisterEvent);

router.route("/events").get(getEventAllEvents).post(addEvent);

router.route("/like").get(getTotalLikes).post(likeAndDislike);

router.route("/post").get(getPosts).post(addPost);

router.route("/user").get(getUser).post(createUser);

export default router;
