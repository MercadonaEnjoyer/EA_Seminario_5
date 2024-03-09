import { IPost } from './model';
import posts from './schema';

export default class PostService {
    
    public async createPost(post_params: IPost): Promise<IPost> {
        try {
            const session = new posts(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterPost(query: any): Promise<IPost | null> {
        try {
            return await posts.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deletePost(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await posts.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async populatePost(query: any): Promise<IPost | null> {
        try {
            // Find the post document and populate the 'author' field
            const post = await posts.findOne(query).populate('author').exec();
            if (!post) {
                return null;
            }
            // Convert _id to string
            const populatedPost: IPost = {
                ...post.toObject(),
                _id: post._id
            };
            return populatedPost;
        } catch (error) {
            throw error;
        }
    }
}