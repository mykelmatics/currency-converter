
function CurrencyInput(props) {
  return (
    <div className="group">
      <div>
        <p className="input-title">Amount</p>
        <input className="input"
          type="number"
          value={props.amount}
          onChange={(ev) => props.onAmountChange(ev.target.value)}
        />
      </div>
     
      <p className="input-title">{props.title}</p>
      
      <select
        className="select input"
        value={props.currency}
        onChange={(ev) => props.onCurrencyChange(ev.target.value)}>
        {props.currencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput