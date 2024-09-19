function handlePayment(id, price) {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://uat.esewa.com.np/epay/main");
    form.setAttribute("target","_blank")
    const tAmtInput = document.createElement("input");
    tAmtInput.setAttribute("type", "hidden");
    tAmtInput.setAttribute("name", "tAmt");
    tAmtInput.setAttribute("value", `${price}`);
    form.appendChild(tAmtInput);
  
    const amtInput = document.createElement("input");
    amtInput.setAttribute("type", "hidden");
    amtInput.setAttribute("name", "amt");
    amtInput.setAttribute("value", `${price}`);
    form.appendChild(amtInput);
  
    const txAmtInput = document.createElement("input");
    txAmtInput.setAttribute("type", "hidden");
    txAmtInput.setAttribute("name", "txAmt");
    txAmtInput.setAttribute("value", "0");
    form.appendChild(txAmtInput);
  
    const pscInput = document.createElement("input");
    pscInput.setAttribute("type", "hidden");
    pscInput.setAttribute("name", "psc");
    pscInput.setAttribute("value", "0");
    form.appendChild(pscInput);
  
    const pdcInput = document.createElement("input");
    pdcInput.setAttribute("type", "hidden");
    pdcInput.setAttribute("name", "pdc");
    pdcInput.setAttribute("value", "0");
    form.appendChild(pdcInput);
  
    const scdInput = document.createElement("input");
    scdInput.setAttribute("type", "hidden");
    scdInput.setAttribute("name", "scd");
    scdInput.setAttribute("value", "EPAYTEST");
    form.appendChild(scdInput);
  
    const pidInput = document.createElement("input");
    pidInput.setAttribute("type", "hidden");
    pidInput.setAttribute("name", "pid");
    pidInput.setAttribute("value", `${id}-${Date.now()}`);
    form.appendChild(pidInput);
  
    const suInput = document.createElement("input");
    suInput.setAttribute("type", "hidden");
    suInput.setAttribute("name", "su");
    suInput.setAttribute("value", `http://localhost:5173/products?q=su`);
    form.appendChild(suInput);
  
    const fuInput = document.createElement("input");
    fuInput.setAttribute("type", "hidden");
    fuInput.setAttribute("name", "fu");
    fuInput.setAttribute("value", `http://localhost:5137/products?bid=${id}`);
    form.appendChild(fuInput);
  
    document.body.appendChild(form);
    form.submit();
  }
export default handlePayment