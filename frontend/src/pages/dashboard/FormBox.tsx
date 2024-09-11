import React, { useState } from "react";
import DashboardBox from "../../assets/DashboardBox";
import { LinearProgress, Typography } from "@mui/joy";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../context/useAuth";

const FormBox = () => {
    const auth = useAuth();
    const forms = auth?.forms;

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleAddTeamMember = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await axios.post("/user/add-teammate", {
                firstName,
                lastName,
                country,
                jobTitle,
                phoneNumber,
                email,
                password
            });
            if (res.status !== 201) {
                throw new Error("Unable to add team member");
            }
            setOpen(false);
            // Clear form fields
            setFirstName('');
            setLastName('');
            setCountry('');
            setJobTitle('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error adding team member:", error.message);
            } else if (error instanceof Error) {
                console.error("General error adding team member:", error.message);
            } else {
                console.error("Unknown error adding team member:", error);
            }
        }
    };

    const handleNavigate = () => {
        navigate('/101-form/Form');
    };

    return (
        <>
            <DashboardBox gridArea="b">
                <Card sx={{ width: "100%", height: "100%", border: "none" }}>
                    <div>
                        <Typography level="title-lg">Formulario 101</Typography>
                        <Typography level="body-sm">{forms?.filledFields} de {forms?.totalFields} preguntas respondidas</Typography>
                        <IconButton
                            aria-label="add team member"
                            variant="plain"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                            onClick={() => setOpen(true)}
                        >
                            <GroupAddIcon />
                        </IconButton>
                    </div>
                    <LinearProgress determinate value={forms?.progress} size="lg" color="success" />
                    <CardContent orientation="horizontal">
                        <div>
                            <Typography level="body-xs">Progreso:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                {forms?.progress}%
                            </Typography>
                        </div>
                        <Button
                            variant="solid"
                            size="md"
                            color="success"
                            aria-label="Ir al formulario"
                            onClick={handleNavigate}
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                        >
                            Ir al formulario
                        </Button>
                    </CardContent>
                </Card>
            </DashboardBox>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Agregar Nuevo Miembro del Equipo</DialogTitle>
                    <DialogContent>Complete la información del nuevo miembro del equipo.</DialogContent>
                    <form onSubmit={handleAddTeamMember}>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Apellido</FormLabel>
                                <Input
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>País</FormLabel>
                                <Input
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Título del Trabajo</FormLabel>
                                <Input
                                    required
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Número de Teléfono</FormLabel>
                                <Input
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <Input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit">Enviar</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default FormBox;
