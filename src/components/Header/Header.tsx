import type { ReactComponent } from '@/types';

import type { HeaderMenuItemType } from './HeaderTypes';

import { IconHamburger } from '@/components/common';

import { HeaderBrand, HeaderMenuItem } from './components';

import styles from './Header.module.scss';

type PropsType = {
	pageName?: string;
	IsSliderOpen: boolean;
	leftMenuItems?: HeaderMenuItemType[];
	rightMenuItems?: HeaderMenuItemType[];
	handleSliderTriggerButtonClick: () => void;
};

export const Header: ReactComponent<PropsType> = props => {
	const { pageName, IsSliderOpen } = props;
	const { leftMenuItems = [], rightMenuItems = [] } = props;
	const { handleSliderTriggerButtonClick } = props;

	const leftMenuItemsWithTrigger: HeaderMenuItemType[] = [
		{
			id: 'slider_trigger',
			type: 'button',
			title: `${IsSliderOpen ? 'Скрыть' : 'Показать'} боковое меню'`,
			icon: <IconHamburger />,
			onClick: IsSliderOpen ? () => void 0 : handleSliderTriggerButtonClick,
		},
		...leftMenuItems,
	];

	return (
		<header className={styles.header}>
			<ul className={styles.header__menu}>
				{leftMenuItemsWithTrigger.map(menuItem => (
					<li key={menuItem.id} className={styles.header__menu__item}>
						<HeaderMenuItem {...menuItem} className={styles.header__menu__button} />
					</li>
				))}
			</ul>

			<HeaderBrand pageName={pageName} />

			<ul
				className={styles.header__menu}
				aria-hidden={rightMenuItems.length === 0 ? 'true' : undefined}>
				{rightMenuItems.map(menuItem => (
					<li key={menuItem.id} className={styles.header__menu__item}>
						<HeaderMenuItem {...menuItem} className={styles.header__menu__button} />
					</li>
				))}
			</ul>
		</header>
	);
};
