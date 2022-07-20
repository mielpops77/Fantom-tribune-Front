import TableLaunchService from '../tableauLaunh/tableauLaunch.service'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import React from 'react'
import tableauLaunchService from '../tableauLaunh/tableauLaunch.service';



class HolderBalance extends React.Component {


    async fetchData(i) {


        let a = "";
        a = TableLaunchService.getListAllContract()[i].contractAddress;
        const hoprClient = new ApolloClient({
            uri: 'https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap',
            cache: new InMemoryCache()
        })
        let holderBalanceQuery = ``

        if (a !== "") {
            holderBalanceQuery = `
                {
                  tokenDayDatas
                  (first: 1, orderBy: date, orderDirection: desc,
                    where: { token: "${a}"})
                  
                    { token { id  } priceUSD } },
                
                `
        }


        try {
            let skip = 0
            let allResults = []
            /*  while (!found) { */
            let result = await hoprClient.query({
                query: gql(holderBalanceQuery),
                variables: {
                    skip: skip
                },
                fetchPolicy: 'cache-first',

            })


            await TableLaunchService.ftmScanTotalSupply(TableLaunchService.getListAllContract()[i].contractAddress);
            allResults = allResults.concat(result.data.accounts);
            if (result.data.tokenDayDatas.length !== 0)
            {
                TableLaunchService.setPriceList(i, Number(result.data.tokenDayDatas[0].priceUSD), result.data.tokenDayDatas[0].token.id, tableauLaunchService.getSupply());
            }
            else{
                TableLaunchService.setPriceList(i, 0, TableLaunchService.getListAllContract()[i].contractAddress, 0);

            }
            /*  } */

            return allResults
        } catch (e) {
            console.error(e)
        }

    }

    async contractList() {
        await TableLaunchService.contractSpooky();
    }


    componentDidMount() {
        console.log('départ');
        this.contractList();
        console.log('after');

        //La Condition se valide si la liste des contract à déja été récupéré au préalable 
        if (TableLaunchService.getListAllContract().length !== 0) {

            //On initialise la PriceList suivant le nbr de contract
            TableLaunchService.initPriceList(TableLaunchService.getListAllContract().length);


            //Ici on lance les request SubgraphSpooky et ftmScan
            for (let i = 0; i < TableLaunchService.getListAllContract().length; i++) {
                this.fetchData(i);
            }




        }
    }


    render() {
        return (
            <div>
            </div>
        )
    }
}

export default HolderBalance