import { TERMINALS, TERMINALS_NAME } from "./terminals";

//Constant
const MC_VC_EFT = 0.008;

function numberWithCommas(x:any) {
    x = x?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x?.replace(pattern, "$1,$2");
    return x;
}

const BDM = [
    [1, 75],
    [20000, 100],
    [50000, 100],
    [75000, 150],
    [100000, 200],
    [150000, 300],
    [200000, 400],
    [250000, 500],
    [300000, 600],
    [400000, 800],
    [500000, 1000],
    [1000000, 2000],
]

const AMEX = [
    [0,5, 0],
    [5, 10, 0.05],
    [10, 15, 0.10],
    [15, 25, 0.15]
]

const vlook = (value=0, array, column=1) => {

    const arr = array.filter(item => value >= item[0])
    return arr[arr.length - 1][column - 1]

}

const DEAL_BANDWIDTH = [18, 30, 101];

const LOADING = [0, 7.5, 10];

const ALERT = ["RED", "YELLOW", "GREEN"];
const COLOR = ["#ee4949", "#efb02c", "#12c743"];

const TEXT = ["Send to Sales Director", "Subject to Review", "Send to Sales Admin"];


const getAmexCost = (percent) => {
    const item = AMEX.filter(row => row[0] < percent && row[1] >= percent)
    if(item?.length === 1){
        return ((item[0][2]/100) + MC_VC_EFT)
    }else{
        return 0.008
    }
} 

const getTerminalCost = (terminal_no=0, quantity=0) => {
    return TERMINALS[terminal_no] * quantity
}

const calculator = (params) => {

    // var params = Object.fromEntries(Object.entries(__params).map(item => [item[0], Number(item[1])]))

    const {
        monthly_ttv, 
        terminal_number, 
        atv, 
        sell_rate, 
        terminal_quantity, 
        free_ba, 
        free_myplace, 
        free_pos, 
        amex_percent 
    } = params

    
    var msf = (sell_rate/100) * monthly_ttv; //Sell Rate * ttv
    var cost = (getAmexCost(amex_percent) * monthly_ttv) + 
                getTerminalCost(terminal_number, terminal_quantity) + 
                free_pos + 
                free_ba + 
                free_myplace; //
    var grossProfitBeforeComms = msf - cost;
    var gp = (grossProfitBeforeComms / msf) * 100;

    var final = '';
    var final_index = 0;
    // console.log(msf, cost)

    // console.log("Cost:", getAmexCost(amex_percent, ttv), getTerminalCost(terminal_no, terminal_quantity) , free_pos , free_ba , free_myplace)

    for (let index = 0; index < DEAL_BANDWIDTH.length; index++) {
        const element = DEAL_BANDWIDTH[index];

        if(gp < element){
            final = ALERT[index]
            final_index = index
            break;
        }
    }

    var signup = gp >= DEAL_BANDWIDTH[0] ? vlook(monthly_ttv, BDM, 2) : 0
    var trail = (LOADING[final_index]/100) * grossProfitBeforeComms;

    var annualgp = Math.round((grossProfitBeforeComms * 12) - signup - (trail * 12))

    // console.log(signup, trail, signup + trail)
    

    return {
        atv, 
        deal_or_no_deal: final, 
        gp: gp > 0 ? gp : 0, 
        grossProfitBeforeComms: Math.round(grossProfitBeforeComms), 
        cost: Math.round(cost), 
        msf: Math.round(msf), 
        terminal_cost: getTerminalCost(terminal_number, terminal_quantity),
        terminal_unit: TERMINALS[terminal_number],
        terminal_name: TERMINALS_NAME[terminal_number],
        terminal_display: terminal_number > 0 ? "block" : "none",
        nTx: Math.floor(monthly_ttv/atv),
        signup: Math.round(signup),
        trail: Math.round(trail),
        bdm: Math.round(signup + trail),
        annualgp: annualgp > 0 ? annualgp : 0,
        text: TEXT[final_index],
        color: COLOR[final_index],
        ttv: numberWithCommas(monthly_ttv)
    }
}

export default calculator;
