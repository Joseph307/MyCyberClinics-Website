import {definePlugin} from 'sanity';
import ShareTool from './tool/ShareTool';
import shareDocumentAction from './action/ShareAction';

export default definePlugin(() => ({
  name: 'share-to-buffer-plugin',
  tools: (prev = []) => [
    ...prev,
    {
      name: 'share-to-buffer',
      title: 'Share',
      component: ShareTool,
    },
  ],
  // Register a document action so editors can share directly from the
  // blog post editor. We concat to the existing actions to preserve default
  // Studio actions like Publish/Delete.
  document: {
    actions: (prev = []) => [...prev, shareDocumentAction],
  },
}));
