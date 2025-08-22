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
}

export default function CriarNovoCompromisso({data} : Data) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Icon onClick={onOpen} className="pointer" icon="mdi:plus-circle" color="black" width={20} />

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar novo compromisso em {data}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Título do compromisso</FormLabel>
              <Input placeholder='Título do compromisso'/>
            </FormControl>
            <FormControl>
              <FormLabel>Descrição do compromisso</FormLabel>
              <Input placeholder='Descrição do compromisso'/>
            </FormControl>
            <FormControl>
              <FormLabel>Horário do compromisso</FormLabel>
              <Input placeholder='Horário do compromisso'/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme='green'>Criar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}