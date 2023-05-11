import mongoose from 'mongoose';

import { Todo } from '../schema';

//------------------------------------------------------------------------------------------------//

export default mongoose.model('todos', Todo);
