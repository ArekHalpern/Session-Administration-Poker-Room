import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTablesThunk, deleteTableThunk } from '../store/tables';
import { Card, CardGroup, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TablesList = ({ tables, fetchTablesThunk, deleteTableThunk }) => {

  useEffect(() => {
    fetchTablesThunk();
  }, [fetchTablesThunk]);

  const handleDelete = async (tableId, event) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmation = window.confirm('Are you sure you want to delete this table?');
    if (confirmation) {
      await deleteTableThunk(tableId);
    }
  };
  
  return (
    <Container className="mt-4">
      <CardGroup>
        {tables.map(table => (
          <Card className="table-card mb-4" key={table.id}>
            {/* Updated Link */}
            <Link to={`/tables/${table.id}`} className="stretched-link" />
            <Card.Body>
              <Card.Title>Table {table.number}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Button 
                variant="danger" 
                className="delete-button" 
                onClick={(event) => handleDelete(table.id, event)}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </Container>
  );
};

const mapStateToProps = state => ({
  tables: state.tables,
});

const mapDispatchToProps = {
  fetchTablesThunk: fetchTablesThunk,
  deleteTableThunk: deleteTableThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
