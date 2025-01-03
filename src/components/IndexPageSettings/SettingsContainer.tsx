import React from 'react';

import type { ReactComponent } from '@/types';

import { useNewYearSnow, usePlayerSettings } from '@/hooks';
import type { PlayerType } from '@/providers/PlayerSettingsProvider/types';

import { SelectOptionType } from './SettingsTypes';

import styles from './Settings.module.scss';

type PropsType = {
	handleCloseSettingsTriggerClick: () => void;
};

export const SettingsContainer: ReactComponent<PropsType> = props => {
	const { SelectedPlayer, setSelectedPlayer } = usePlayerSettings();
	const { IsNewYearSnowEnabled, setIsNewYearSnowEnabled } = useNewYearSnow();

	const { handleCloseSettingsTriggerClick } = props;

	const handleFormSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}, []);

	return (
		<div className={styles.settings}>
			<div className={styles.settings__backdrop} onClick={handleCloseSettingsTriggerClick} />

			<div className={styles.settings__content}>
				<h3>Настройки</h3>

				<form onSubmit={handleFormSubmit}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="player_selector">Выбор плеера</label>
								</td>

								<td>
									<select
										id="player_selector"
										value={SelectedPlayer}
										onChange={event => setSelectedPlayer(event.target.value as PlayerType)}>
										{Players.map(PlayerInfo => (
											<option key={PlayerInfo.value} value={PlayerInfo.value}>
												{PlayerInfo.text}
											</option>
										))}
									</select>
								</td>
							</tr>

							<tr title="Выбор локализации пока-что недоступен">
								<td>
									<label htmlFor="locale_selector">Выбор локализации</label>
								</td>

								<td>
									<select id="locale_selector" value="ru" onChange={() => void 0} disabled>
										{Locales.map(PlayerInfo => (
											<option key={PlayerInfo.value} value={PlayerInfo.value}>
												{PlayerInfo.text}
											</option>
										))}
									</select>
								</td>
							</tr>

							<tr>
								<td>
									<label htmlFor="newYearSnow_selector">Включить снег</label>
								</td>
								<td>
									<input
										id="newYearSnow_selector"
										type="checkbox"
										checked={IsNewYearSnowEnabled}
										onChange={event => setIsNewYearSnowEnabled(event.target.checked)}
									/>
								</td>
							</tr>
						</tbody>
					</table>

					<div className={styles.settings__content__controls}>
						<button onClick={handleCloseSettingsTriggerClick}>Закрыть</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const Players: SelectOptionType<PlayerType>[] = [
	{
		value: 'vk',
		text: 'VK Видео',
	},
	{
		value: 'twitch',
		text: 'Twitch (zdesneanime)',
	},
	{
		value: 'twitch-monarhiq',
		text: 'Twitch (MonarhiQ)',
	},
	{
		value: 'twitch-banan',
		text: 'Twitch (rcm92587)',
	},
	{
		value: 'twitch-rulait',
		text: 'Twitch (ruLait)',
	},
];

const Locales: SelectOptionType<string>[] = [
	{
		value: 'ru',
		text: '🇷🇺 Русская',
	},
];
