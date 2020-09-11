import React from 'react';
import {DevTools, Typography} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        paddingTop: 40,
        background: '#EFEFEF'
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        width: 100
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        width: 400
    },
    link: {
        display: 'flex',
        alignItems: 'center'
    }
};

const DeveloperToolsEmpty = () => {
    const {t} = useTranslation('jahia-developer-tools');
    return (
        <div style={styles.container}>
            <div style={styles.icon}>
                <DevTools/>
            </div>
            <div style={styles.text}>
                <Typography component="h2" variant="strong">{t('label')}</Typography>
                <Typography component="p">{t('about')}</Typography>
            </div>
        </div>
    );
};

export default DeveloperToolsEmpty;