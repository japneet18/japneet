import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import jquery from 'jquery';
import 'primeicons/primeicons.css';
import { Image, DataDiv } from './CommonTable.styled.js';
import DetailsPopUp from './DetailsPopup.js'


const App = (props) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cryptosDetail, setCryptosDetail] = useState();
  const [DetailsVisible, setDetailsVisible] = useState(false);
  const loadingText = () => <span className="loading-text" />;
  const [scrollHeight,setScrollHeight]=useState('1000px');
  const [virtualHeight,setVirtualHeight]=useState(10);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(res => {
        setCryptos(res.data);
        setLoading(false);

      }
      )
  }, [])
  useEffect(()=>{
    const scrollableHeight=()=>{ if (window.matchMedia("(min-height: 1080px)").matches) { // If media query matches 
      //mentioned maximum devices case
      //scroll height is kept as a rough 80 less than min height
      // virtual height is scroll height/no of rows on the page ie 10 in our case
      setScrollHeight('1000px')
      setVirtualHeight(100)
    } else if (window.matchMedia("(min-height: 900px)").matches){
      setScrollHeight('820px')
      setVirtualHeight(82)
    }
    else if (window.matchMedia("(min-height: 768px)").matches){
      setScrollHeight('688px')
 setVirtualHeight(68)
    }
     else if (window.matchMedia("(min-height: 1440px)").matches){
          setScrollHeight('1360px')
     setVirtualHeight(136)
        }
        else if (window.matchMedia("(min-height: 800px)").matches){
          setScrollHeight('720px')
     setVirtualHeight(72)
        }
        else if (window.matchMedia("((min-height: 1366px)").matches){
          setScrollHeight('688px')
     setVirtualHeight(68)
        }
        else if (window.matchMedia("(min-height: 864px)").matches){
          setScrollHeight('784px')
     setVirtualHeight(78)
        }
        else if (window.matchMedia("(min-height: 1050px)").matches){
          setScrollHeight('970px')
     setVirtualHeight(97)
        }
        else if (window.matchMedia("(min-height: 720px)").matches){
          setScrollHeight('640px')
     setVirtualHeight(64)
        }
        else if (window.matchMedia("(min-height: 800px)").matches){
          setScrollHeight('720px')
     setVirtualHeight(72)
        }
        else if (window.matchMedia("(min-height: 640px)").matches){
          setScrollHeight('560px')
     setVirtualHeight(56)
        }
        
  
    }
    scrollableHeight();
  })


  const fetchMoreData = () => {
    setLoading(true);
    jquery(
      '.p-datatable-scrollable-body-table > tbody .p-row-editor-cancel'
    ).click();
    var pageNumber = cryptos.length / 10;

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=${pageNumber + 1}&sparkline=false`)
      .then(res => {
        setCryptos([...cryptos, ...res.data])
        setLoading(false);
      })
      .catch(function (error) {
        //  console.log("error>>>", error);

      });

  };



  const imageTemplate = (rowData) => {

    return (
      <React.Fragment>
        <Image src={rowData.image} />

      </React.Fragment>
    );
  }
  const onCloseButtonClick = () => {
    setDetailsVisible(false);
  }
  const handleRowClick = (rowData) => {
    if (rowData.data.id) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${rowData.data.id}`)
      .then(res => {
        setCryptosDetail(res.data);
        setDetailsVisible(true);
      })
      .catch(function (error) {
        //  console.log("error>>>", error);

      });
    }

  };
  return (
    // virtualScroll to implement lazy loading initially data of 10 would come then more data would be fetched via fetchMoreData
    //LoadingText though represents an empty span but is important for virtual scroll process
    //virtualScrollDelay refers to Delay time default is 250 causes issue becuase the user might go down till that point hence -1 given 
    //total records currently given a dummy value of hundered it represnts the max record
    //loading will be set true to display loader and false to remove 
    // DataDiv and image used are styledComponents
    <>
    {console.log("scrollHeight",scrollHeight,"virtualheight",virtualHeight)}
      <div style={{ width: '100%' }}>

        <DataTable
          value={cryptos}
          lazy={true}
          scrollable={true}
          scrollHeight={scrollHeight}
          virtualRowHeight={virtualHeight}
          totalRecords={10}
          rows={10}
          virtualScrollDelay={-1}
          virtualScroll={cryptos.length >= 10}
          totalRecords={100}
          onVirtualScroll={fetchMoreData}
          loading={loading}
          onRowClick={handleRowClick}

        >


          <Column field='image' header='Image' body={imageTemplate} headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} />
          <Column field='name' header='Name' headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} body={(rowData) => {
            return <DataDiv>{rowData.name}</DataDiv>
          }} />
          <Column field='symbol' header='Symbol' headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} body={(rowData) => {
            return <DataDiv>{rowData.symbol}</DataDiv>
          }} />
          <Column field='current_price' header='Current Price' headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} body={(rowData) => {
            return <DataDiv>€ {rowData.current_price}</DataDiv>
          }} />
          <Column field='high_24h' header='High 24 hour Price' headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} body={(rowData) => {
            return <DataDiv>€ {rowData.high_24h}</DataDiv>
          }} />
          <Column field='low_24h' header='Low 24 hour Price' headerStyle={{
            fontFamily: 'Gotham Medium',
            fontSize: '18px',
            backgroundColor: 'rgba(128, 173, 251, 0.5)'
          }} loadingBody={loadingText} body={(rowData) => {
            return <DataDiv>€ {rowData.low_24h}</DataDiv>
          }} />
        </DataTable>
        {DetailsVisible &&
          <DetailsPopUp visible={DetailsVisible} details={cryptosDetail} onCloseButtonClick={onCloseButtonClick} />
        }
      </div>
    </>


  )
}


export default App;