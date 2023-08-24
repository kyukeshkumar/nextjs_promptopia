import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({

  creator:{
    type:String,
    required:[true,'Creator required'],
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  image:{
    type:String,
    required:[true,'image is required']
  },
  username:{
    type:String,
    required:[true,'username is required']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }

});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;