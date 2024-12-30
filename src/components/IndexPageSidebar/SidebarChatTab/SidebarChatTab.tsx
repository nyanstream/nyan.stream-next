import type { ReactComponent } from '@/types';

import { IndexPageChat } from '../../IndexPageChat/IndexPageChat';

type PropsType = {
	className: string;
	isVisible: boolean;
};

export const SidebarChatTab: ReactComponent<PropsType> = ({ className, isVisible }) => {
	return (
		<section className={className} hidden={!isVisible}>
			<IndexPageChat />
		</section>
	);
};
