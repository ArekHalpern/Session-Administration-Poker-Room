// function AddPlayer() {
//     const dispatch = useDispatch();
//     const [playerName, setPlayerName] = useState('');
//     const [tableId, setTableId] = useState('');
//     const [seatNumber, setSeatNumber] = useState('');
//     const [seatAssignments, setSeatAssignments] = useState([]);
  
//     const handleAddPlayerToTable = () => {
//       dispatch(addPlayerToTableThunk(tableId, playerName));
//     };
  
//     const handleAssignPlayerToSeat = () => {
//       dispatch(assignPlayerToSeatThunk(tableId, seatNumber, playerName))
//         .then(() => {
//           setSeatAssignments(prevSeatAssignments => [
//             ...prevSeatAssignments,
//             { playerName, seatNumber }
//           ]);
//         });
//     };
  
//     const handleCreateTable = () => {
//       dispatch(createTableThunk({ name: tableId, seats: seatAssignments }));
//       resetForm();
//     };
  
//     const resetForm = () => {
//       setPlayerName('');
//       setTableId('');
//       setSeatNumber('');
//       setSeatAssignments([]);
//     };
  
//     return (
//       <div>
//         {/* Render the list of seat assignments */}
//         <div className="mb-3">
//           {seatAssignments.map((assignment) => (
//             <div key={`${assignment.playerName}-${assignment.seatNumber}`}>
//               {assignment.playerName}: Seat {assignment.seatNumber}
//             </div>
//           ))}
//         </div>
//         <Form>
//         <Form.Group as={Row} className="mb-3">
//           <Form.Label column sm={2}>
//             Player Name
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="text"
//               placeholder="Enter Player Name"
//               value={playerName}
//               onChange={(e) => setPlayerName(e.target.value)}
//             />
//           </Col>
//         </Form.Group>
//         <Form.Group as={Row} className="mb-3">
//           <Form.Label column sm={2}>
//             Table ID
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="text"
//               placeholder="Enter Table ID"
//               value={tableId}
//               onChange={(e) => setTableId(e.target.value)}
//             />
//           </Col>
//         </Form.Group>
//         <Form.Group as={Row} className="mb-3">
//           <Form.Label column sm={2}>
//             Seat Number
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Select
//               value={seatNumber}
//               onChange={(e) => setSeatNumber(e.target.value)}
//             >
//               <option value="" disabled>Select Seat Number</option>
//               {[...Array(10).keys()].map(i => (
//                 <option key={i} value={i + 1}>{i + 1}</option>
//               ))}
//             </Form.Select>
//           </Col>
//         </Form.Group>
//         <Button variant="primary" onClick={handleAddPlayerToTable}>
//           Add Player to Table
//         </Button>
//         {seatNumber && (
//           <Button variant="secondary" onClick={handleAssignPlayerToSeat}>
//             Assign Player to Seat
//           </Button>
//         )}
//         <Button variant="success" onClick={handleCreateTable} className="ms-2">
//           Create Table
//         </Button>
//         <Button variant="warning" onClick={resetForm} className="ms-2">
//           Reset
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default AddPlayer;

