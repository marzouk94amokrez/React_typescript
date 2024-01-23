import styled from 'styled-components';

export const AFContainer = styled.div`
    width: 100%;
    /* overflow: auto; */
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AFInterval = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    margin-right: 0.25rem;
    width: 80%;
`;

export const AFIntervalFrom = styled.h4`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.lightBlack};
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #809FB8;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${AFInterval}:hover & {
        border-bottom: 2px solid #2174B9;
    }
`

export const AFIntervalTo = styled(AFIntervalFrom)`
    margin: 0.5rem 0 0 0;
`

export const AFIntervalTotal = styled(AFIntervalFrom)`
    margin: 0.5rem 0 0 0;
    border-bottom: 2px solid #EE5A5A;
`

export const AFIcon = styled.div`
    cursor: ${({activeReset}) => activeReset ? 'pointer' : 'auto'};
    color: ${({activeReset}) => activeReset ? '#EE5A5A' : '#809FB8'}
`