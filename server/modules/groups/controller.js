import Group from "./model";
import { Meetup } from "../meetups";

export const createGroup = async (req, res) => {
  const { name, description, category } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Name must be provided!" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Name must be a string!" });
  } else if (name.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "Name must have at least 5 characters" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "description must be provided!" });
  } else if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "description must be a string!" });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "description must have at least 10 characters"
    });
  }

  const newGroup = new Group({
    name,
    description,
    category
  });

  try {
    return res.status(201).json({ group: await newGroup.save() });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error when created Group" });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    return res.status(200).json({ meetups: await Group.find({}) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Group" });
  }
};

export const createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "title must be provided!" });
  } else if (typeof title !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "title must be a string!" });
  } else if (title.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "title must have at least 5 characters" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "description must be provided!" });
  } else if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "description must be a string!" });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "description must have at least 10 characters"
    });
  }

  if (!groupId) {
    return res
      .status(400)
      .json({ error: true, message: "Group id must have be provided" });
  }

  try {
    const { meetup, group } = await Group.addMeetup(groupId, {
      title,
      description
    });
    return res.status(201).json({ error: false, meetup, group });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Meetup cannot be created!" });
  }
};

export const getGroupMeetups = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res
      .status(400)
      .json({ error: false, message: "Group id must have be provided" });
  }

  const group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({ error: true, message: "Group not exist" });
  }

  try {
    return res.status(200).json({
      error: false,
      meetups: await Meetup.find({ group: groupId }).populate("group", "name")
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "cannot fetch meetup" });
  }
};