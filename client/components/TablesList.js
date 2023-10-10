import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTablesThunk, getSingleTableThunk, deleteTableThunk } from '../store/tables';
import { Card, CardGroup, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TablesList = ({ tables, getTables, getSingleTable, deleteTable }) => {
  useEffect(() => {
    getTables();
  }, [getTables]);

  const handleDelete = async (tableId) => {
    const confirmation = window.confirm('Are you sure you want to delete this table?');
    if (confirmation) {
      await deleteTable(tableId);
    }
  };

  return (
    <Container className="mt-4">
      <CardGroup>
        {tables.map(table => (
          <Link to={`/tables/${table.id}`} key={table.id} onClick={() => getSingleTable(table.id)}>
            <Card className="table-card mb-4">
              <Card.Body>
                <Card.Title>{table.number}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Button variant="danger" className="delete-button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(table.id); }}>Delete</Button>
              </Card.Footer>
            </Card>
          </Link>
        ))}
      </CardGroup>
    </Container>
  );
};

const mapStateToProps = state => ({
  tables: state.tables,
});

const mapDispatchToProps = dispatch => ({
  getTables: () => dispatch(getTablesThunk()),
  getSingleTable: (tableId) => dispatch(getSingleTableThunk(tableId)),
  deleteTable: (tableId) => dispatch(deleteTableThunk(tableId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
