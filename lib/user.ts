import { prisma } from './prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string | Buffer) => {
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);
	return passwordHash;
};

export const isEmailExist = async (email: string) => {
	const user = await prisma.user.findFirst({ where: { email } });
	return user ? true : false;
};
export const createUser = async (newUser: User) => {
	const defaultRole = await prisma.role.findFirst({
		where: { roleName: 'user' },
	});
	const result = await prisma.user.create({
		data: {
			email: newUser.email,
			password: await hashPassword(newUser.password),
			roleIds: defaultRole?.id,
		},
	});
	return result;
};

export const getAllUsers = async () => {
	const result = await prisma.user.findMany();
	return result;
};

export const getUserById = async (id: string): Promise<User> => {
	const result = await prisma.user.findUniqueOrThrow({
		where: { id: id },
	});
	return result;
};

export const getUserByEmail = async (email: string): Promise<User> => {
	const result = await prisma.user.findFirstOrThrow({
		where: { email: email },
	});
	return result;
};

export const deleteUser = async (id: string) => {
	const result = await prisma.user.delete({
		where: { id: id },
	});
	return result;
};
