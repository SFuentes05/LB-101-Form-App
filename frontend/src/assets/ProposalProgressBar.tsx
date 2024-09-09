import React from 'react';

interface ProgressBarProps {
    percentage: number;
    label: string;
    usedStorage: string;
    totalStorage: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label, usedStorage, totalStorage }) => {
    return (
        <div style={styles.container}>
            <div style={styles.label}>{label}</div>
            <div style={styles.progressBar}>
                <div style={{ ...styles.filledBar, width: `${percentage}%` }}></div>
            </div>
            <div style={styles.storageInfo}>
                <div>{usedStorage}</div>
                <div>{totalStorage}</div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '395px',
    
        borderRadius: '10px',
        padding: '25px',
        
    },
    label: {
        fontWeight: 'bold' as const,
        marginBottom: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '25px',
    },
    progressBar: {
        width: '100%',
        backgroundColor: '#d9d9d9',
        borderRadius: '10px',
        overflow: 'hidden',
        height: '10px',
        marginBottom: '10px',
    },
    filledBar: {
        height: '100%',
        backgroundColor: '#000000',
    },
    storageInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
    },
};

export default ProgressBar;