import { calculateInvestmentResults, formatter } from "../util/investment";


export default function Result({info}) {
    let data = [];


    // preprocess
    // for (let i = 1; i <= info.duration; i++) {
    //     let rowData = {};
    //     rowData.year = i;
    //     rowData.investmentValue = 
    // }


    // BEFORE THE LECTURE SHOWED THE "+" SOLUTION THIS WAS USED
    // data = calculateInvestmentResults({
    //     initialInvestment: Number(info.initial), 
    //     annualInvestment: Number(info.annual), 
    //     expectedReturn: Number(info.expected), 
    //     duration: Number(info.duration)
    // });

    data = calculateInvestmentResults({
        initialInvestment: info.initial, 
        annualInvestment: info.annual, 
        expectedReturn: info.expected, 
        duration: info.duration
    });

    let derivedInitialInvestedment = data[0].valueEndOfYear - data[0].annualInvestment - data[0].interest;

    // console.log('CHECK TYPE OF ======')
    // console.log(typeof(info.initial))
    // console.log(typeof(info.annual))
    // console.log(typeof(info.expected))
    // console.log(typeof(info.duration))
    // console.log('CHECK TYPE OF ======')

    // data = calculateInvestmentResults({
    //     initialInvestment: '15000', 
    //     annualInvestment: '900', 
    //     expectedReturn: '6', 
    //     duration: '10'
    // });

    
    return (
        <table id="result">

            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>

            <tbody>
                {data.map((row) => {
                    let totalInterest = row.valueEndOfYear - (row.annualInvestment * row.year) - derivedInitialInvestedment;
                    let investedCapital = derivedInitialInvestedment + (row.annualInvestment * row.year);
                    // FORMULA IN LECTURE
                    // let investedCapital = row.valueEndOfYear - totalInterest;

                    return (
                        <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{formatter.format(row.valueEndOfYear)}</td>
                            <td>{formatter.format(row.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(investedCapital)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}