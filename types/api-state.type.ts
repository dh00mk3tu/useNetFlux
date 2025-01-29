/**
 * This state handling architecture is designed and implemented by Anirudh Rath (me) while I was working 
 * on a Production scale  project at my previous org. This takes some inspiration from BloC pattern of flutter 
 * towards how states should be handle. 
 * I have written a blog about it where describe it in depth and have made a video about it as well; wherein I take
 * a deeper dive on this subject. 
 * 
 * 
 * Blog: https://dh00mk3tu.github.io/blogs/posts/n-states/
 * Video: https://youtu.be/0xMc_ZvsksU
 */

export type State = 'success' | 'failed' | 'loading' | 'idle' 

export interface APIState {
	status: State,
    message?: String, 
    data?: Object
}
