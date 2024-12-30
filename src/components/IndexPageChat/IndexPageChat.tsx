import React from 'react';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('./Chat').then(mod => mod.Chat), {
	ssr: false,
});

export const IndexPageChat: React.FC = () => {
	return <Chat />;
};
