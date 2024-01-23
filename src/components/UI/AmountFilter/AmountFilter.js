import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import RangeSlider from '../RangeSlider/RangeSlider';
import { AFContainer, AFInterval, AFIntervalFrom, AFIntervalTo, AFIntervalTotal, AFIcon } from './AmountFilter.styled';

function AmountFilter({
    modalTitle, 
    from, 
    to, 
    total, 
    name, 
    activeReset, 
    resetInterval, 
    defaultVal,
    defaultValStart,
    defaultValEnd,
    defaultUpdateVal,
    value,
    show, 
    showModal,  
    closeModal, 
    amountChanged}) {

    const {t} = useTranslation();
    
    const amountResetClickHandler = () => {
        if(activeReset)
            resetInterval()
    }

  return (
    <AFContainer>
        <AFInterval onClick={() => showModal()}>
            <AFIntervalFrom>
                {t("global:from")}
                <span>{from}</span>
            </AFIntervalFrom>
            <AFIntervalTo>
                {t("global:to")}
                <span>{to}</span>
            </AFIntervalTo>
            {
                total !== 0 ? (
                    <AFIntervalTotal>
                        {t("global:total", "Total")} : 
                        <span>{total}</span>
                    </AFIntervalTotal>
                ) : null
            }   
        </AFInterval>
        <AFIcon activeReset={activeReset} onClick={() => amountResetClickHandler()}>
            <CloseIcon />
        </AFIcon>
        <RangeSlider 
            defaultVal={defaultVal} 
            defaultValStart={defaultValStart} 
            defaultValEnd={defaultValEnd}  
            defaultUpdateVal={defaultUpdateVal} 
            title={modalTitle} 
            value={value} 
            changed={amountChanged} 
            show={show} 
            closeModal={closeModal} 
        />
    </AFContainer>
);
}

export default AmountFilter;


