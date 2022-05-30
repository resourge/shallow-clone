import { shallowClone } from './lib';

const array: any[] = [];
const array2: any[] = array;

const newArray = shallowClone(array);

array.push(1)
array2.push(2)
newArray.push(3)

console.log('array', array)
console.log('array2', array2)
console.log('newArray', newArray)

console.log('array === array2', array === array2)
console.log('array === newArray', array === newArray)
console.log('newArray === array2', newArray === array2)

function App() {
	return (
		<div style={{ backgroundColor: 'black', width: '100%', height: '100vh' }}>
			App
		</div>
	)
}

export default App
