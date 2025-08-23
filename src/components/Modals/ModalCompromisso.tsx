import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react'
import { Icon } from '@iconify/react/dist/iconify.js';
import "../global.css";
import * as React from "react";

interface Data {
  data: string
  onSave: (compromisso: compromissoDTO) => void,
  onDelete: (compromisso: compromissoDTO) => void
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  objCompromisso: compromissoDTO,
  titulo: string,
  setTitulo: React.Dispatch<React.SetStateAction<string>>,
  descricao: string,
  setDescricao: React.Dispatch<React.SetStateAction<string>>
  horario: string,
  setHorario: React.Dispatch<React.SetStateAction<string>>
}

interface compromissoDTO {
  id: number,
  titulo: string,
  descricao: string,
  horario: string
}

export default function ModalCompromisso({ data, onSave, isOpen, onClose, onOpen, objCompromisso, titulo, setTitulo, descricao, setDescricao, horario, setHorario, onDelete }: Data) {

  function handleClose() {
    onClose();
    setTitulo("");
    setDescricao("");
    setHorario("");
    objCompromisso = { id: 0, titulo: "", descricao: "", horario: "" };
  }
  
  React.useEffect(() => {
    console.log("Use effect modal")
    if (objCompromisso.titulo !== "") {
      setTitulo(objCompromisso.titulo);
      setDescricao(objCompromisso.descricao);
      setHorario(objCompromisso.horario);
    }
  }, [objCompromisso])

  return (
    <>
      <Modal size={"xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{objCompromisso.id > 0 ? "Alterar" : "Criar novo"} compromisso em {data}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Título do compromisso</FormLabel>
              <Input value={titulo} onChange={(event) => setTitulo(event.target.value)} placeholder='Título do compromisso' />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição do compromisso</FormLabel>
              <Input value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder='Descrição do compromisso' />
            </FormControl>
            <FormControl>
              <FormLabel>Horário do compromisso</FormLabel>
              <Input value={horario} onChange={(event) => setHorario(event.target.value)} placeholder='Horário do compromisso' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {objCompromisso.id > 0 && (
              <Button onClick={() => {
                onDelete(objCompromisso);
                handleClose();
              }} colorScheme='red' mr={3}>Excluir</Button>
            )}
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={() => {
              onSave({ id: objCompromisso.id, titulo, descricao, horario });
              handleClose();
            }} colorScheme='green'>{objCompromisso.id > 0 ? "Alterar" : "Criar"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}