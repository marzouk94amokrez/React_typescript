import styled from 'styled-components';

export const DFContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DFInterval = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    margin-right: 0.25rem;
`;

export const DFIntervalFrom = styled.h4`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.lightBlack};
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #809FB8;

    ${DFInterval}:hover & {
        border-bottom: 2px solid #2174B9;
    }
`

export const DFIntervalTo = styled(DFIntervalFrom)`
    margin: 0.5rem 0 0 0;
`

export const DFIcon = styled.div`
    cursor: ${({activeReset}) => activeReset ? 'pointer' : 'auto'};
    color: ${({activeReset}) => activeReset ? '#EE5A5A' : '#809FB8'}
`

