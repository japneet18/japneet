import React from 'react';
import { Dialog } from 'primereact/dialog';
import { NameDiv, ItemDiv } from './CommonTable.styled.js';
const DetailsPopUp = ({ visible, details, onCloseButtonClick }) => {
    return (
        <Dialog
            visible={visible}
            onHide={onCloseButtonClick}
            style={{ width: '1000px' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {details.name &&
                        <>
                            <NameDiv>Name</NameDiv>
                            <ItemDiv>
                                {details.name}
                            </ItemDiv>
                        </>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {details.symbol &&
                        <>
                            <NameDiv>Symbol</NameDiv>
                            <ItemDiv>
                                {details.symbol}
                            </ItemDiv>
                        </>
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {details.hashing_algorithm &&
                        <>
                            <NameDiv>
                                Hashing Algorithm
                            </NameDiv>
                            <ItemDiv>
                                {details.hashing_algorithm}
                            </ItemDiv>
                        </>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {details.description &&
                        <>
                            <NameDiv>Description</NameDiv>
                            <ItemDiv>
                                {JSON.stringify(details.description)}
                            </ItemDiv>
                        </>}
                </div>
                {details.market_data &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <NameDiv> Market cap in Euro</NameDiv>
                        <ItemDiv>
                            {details.market_data.market_cap.eur}
                        </ItemDiv></div>
                }
                {details.links &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <NameDiv>Homepage</NameDiv>
                        <ItemDiv>
                            <a href={details.links.homepage}>{details.links.homepage}</a>
                        </ItemDiv>
                    </div>
                }
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {details.genesis_date &&
                        <>
                            <NameDiv>Genesis Date</NameDiv>
                            <ItemDiv>
                                {details.genesis_date}
                            </ItemDiv>
                        </>

                    }
                </div>
            </div>



        </Dialog>
    );

};

export default DetailsPopUp;