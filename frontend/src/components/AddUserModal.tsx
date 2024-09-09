import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthContext';

export default function AddUserModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');
  const [jobTitle, setJobTitle] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  
  const { addTeamMember } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addTeamMember(firstName, lastName, country, jobTitle, phoneNumber, email, password);
      setOpen(false);
      // Reset form fields after submission
      setFirstName('');
      setLastName('');
      setCountry('');
      setJobTitle('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to add team member:', error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Add New User
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>Fill in the information of the new user.</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Job Title</FormLabel>
                <Input
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
