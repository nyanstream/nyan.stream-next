import { useCallback } from 'react';

import { SelectOptionType } from '../SettingsTypes';
import { PlayerType } from '../../IndexPagePlayer/PlayerTypes';

import styles from './Settings.module.scss';

type PropsType = {
    SelectedPlayer: PlayerType;
    IsSnowEnabled: boolean;
    handleCloseSettingsTriggerClick: () => void;
    handlePlayerChange: (playerName: PlayerType) => void;
    handleSnowCheckboxEventResult: (enabled: boolean) => void;
};

const SettingsContainer: React.FC<PropsType> = props => {
    const { SelectedPlayer, IsSnowEnabled } = props;
    const { handleCloseSettingsTriggerClick, handlePlayerChange, handleSnowCheckboxEventResult } = props;

    const Players: SelectOptionType<PlayerType>[] = [
        {
            value: 'wasd',
            text: 'WASD.TV',
        },
        {
            value: 'twitch-main',
            text: 'Twitch',
        },
        {
            value: 'twitch-backup',
            text: 'Twitch (запасной)',
        },
    ];

    const Locales: SelectOptionType<string>[] = [
        {
            value: 'ru',
            text: '🇷🇺 Русская',
        },
    ];

    const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
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
                                        onChange={e => handlePlayerChange(e.target.value as PlayerType)}
                                    >
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
                                    <label htmlFor="is_snow_enabled">Включить снег?</label>
                                </td>

                                <td>
                                    <input
                                        id="is_snow_enabled"
                                        type="checkbox"
                                        checked={IsSnowEnabled}
                                        onChange={event => handleSnowCheckboxEventResult(event.target.checked)}
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

export default SettingsContainer;
