import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Name must be 5 characters long"]
    },
    description: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Description must be 10 characters long"]
    },
    category: {
      type: String
    },
    meetups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meetup"
      }
    ]
  },
  { timestamps: true }
);

GroupSchema.statics.addMeetup = async function(id, args) {
  const Meetup = mongoose.model("Meetup");

  const meetup = await new Meetup({ ...args, group: id });

  /*   const group = await this.findByIdAndUpdate(
    id,
    { $push: { meetups: meetup.id } }
  ); */

  const group = await this.findByIdAndUpdate(
    id,
    { $push: { meetups: meetup.id } },
    { safe: true, upsert: true }
  );

  //group.meetups.push(meetup);

  //console.log(group);

  //group.meetups.push(meetup);

  //const result = await Promise.all([meetup.save(), group.save()]);

  return {
    meetup: await meetup.save(),
    group
  };
};

export default mongoose.model("Group", GroupSchema);
