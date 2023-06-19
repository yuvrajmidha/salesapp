
//Constant
const MC_VC_EFT = 0.008;

const AMEX = [
    [0,5, 0],
    [5, 10, 0.05],
    [10, 15, 0.10],
    [15, 25, 0.15]
]

const TERMINALS = {
    0:0,
    1: 20,
    2: 25,
    3: 28,
    4: 30,
    5: 33
}

const DEAL_BANDWIDTH = [18, 30, 100];
const ALERT = ["RED", "YELLOW", "GREEN"];


const getAmexCost = (percent) => {
    const item = AMEX.filter(row => row[0] < percent && row[1] >= percent)
    if(item?.length === 1){
        return ((item[0][2]/100) + MC_VC_EFT)
    }else{
        return 0
    }
} 

const getTerminalCost = (terminal_no=0, quantity=0) => {
    return TERMINALS[terminal_no] * quantity
}

const calculator = (params) => {

    console.log(params)

    const {sell_rate = 1.50, ttv = 260000, atv = 30, terminal_no = 3, terminal_quantity=3, free_pos = 150, free_ba = 50, free_myplace = 50, amex_percent = 0} = params
    
    var msf = sell_rate/100 * ttv; //Sell Rate * ttv
    var cost = (getAmexCost(amex_percent) * ttv) + getTerminalCost(terminal_no, terminal_quantity) + free_pos + free_ba + free_myplace; //
    var grossProfitBeforeComms = msf - cost;
    var gp = (grossProfitBeforeComms / msf) * 100;

    var final = '';
    console.log(msf, cost)

    console.log("Cost:", getAmexCost(amex_percent, ttv), getTerminalCost(terminal_no, terminal_quantity) , free_pos , free_ba , free_myplace)

    for (let index = 0; index < DEAL_BANDWIDTH.length; index++) {
        const element = DEAL_BANDWIDTH[index];

        if(gp < element){
            final = ALERT[index]
            break;
        }
    }

    return {deal_or_no_deal: final, gp: gp > 0 ? gp : 0, grossProfitBeforeComms: Math.round(grossProfitBeforeComms), cost: Math.round(cost), msf: Math.round(msf), atv, nTx: Math.floor(ttv/atv)}
}

export default calculator;
