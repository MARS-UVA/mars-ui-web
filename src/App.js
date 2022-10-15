import './App.css';

function App() {
  const handleRaiseBucket = () => {
    console.log('You clicked Raise Bucket Ladder');
  };
  const handleLowerBucket= () => {
    console.log('You clicked Lower Bucket Ladder');
  };
  const handleRaiseBin = () => {
    console.log('You clicked Raise Deposit Bin');
  };
  const handleLowerBin = () => {
    console.log('You clicked Lower Deposit Bin');
  };
  const handleDig = () => {
    console.log('You clicked Dig');
  };
  const handleEditRBL = () => {
    console.log('You clicked Edit for Raise Bucket Ladder');
  };
  const handleEditLBL = () => {
    console.log('You clicked Edit for Lower Bucket Ladder');
  };
  const handleEditRDB= () => {
    console.log('You clicked Edit for Raise Deposit Bin');
  };
  const handleEditLDB= () => {
    console.log('You clicked Edit for Lower Deposit Bin');
  };
  const handleEditDig = () => {
    console.log('You clicked Edit for Dig');
  };
  return (
    <div className="App">
      <h1>MARS Website</h1>
      <button type="button" onClick={handleRaiseBucket}>Raise Bucket Ladder</button>
      <button type="button" onClick={handleEditRBL}>Edit</button>
      <br/>
      <button type="button" onClick={handleLowerBucket}>Lower Bucket Ladder</button>
      <button type="button" onClick={handleEditLBL}>Edit</button>
      <br/>
      <button type="button" onClick={handleRaiseBin}>Raise Deposit Bin</button>
      <button type="button" onClick={handleEditRDB}>Edit</button>
      <br/>
      <button type="button" onClick={handleLowerBin}>Lower Deposit Bin</button>
      <button type="button" onClick={handleEditLDB}>Edit</button>
      <br/>
      <button type="button" onClick={handleDig}>Dig</button>
      <button type="button" onClick={handleEditDig}>Edit</button>
    </div>
  );
}
function sayHello() {
  alert('You clicked me!');
}
// Usage
<button onClick={sayHello}>Default</button>;

export default App;
