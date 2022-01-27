import mongoose from "mongoose";

const {Schema} = mongoose;

const CategorySchema = new Schema({
	id: {type: Number, required: true},
	name: {type: String, required: true},
	image: {type: String, required: true},
	since: {type: Date, required: true}
})

export default mongoose.model('Category', CategorySchema)
