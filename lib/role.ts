import { Role } from '@prisma/client';
import { prisma } from './prisma';

export const isRoleExist = async (roleName: string): Promise<boolean> => {
	return (
		(
			await prisma.role.findMany({
				where: {
					roleName: roleName,
				},
			})
		).length >= 1
	);
};

export const createRole = async (roleName: string) => {
	const result = await prisma.role.create({
		data: {
			roleName: roleName.toLocaleLowerCase(),
		},
	});
	return result;
};

export const updateRole = async (id: string, roleName: string) => {
	const result = await prisma.role.update({
		where: {
			id: id,
		},
		data: {
			roleName: roleName.toLocaleLowerCase(),
		},
	});
	return result;
};

export const getAllRoles = async (): Promise<Role[]> => {
	const result = await prisma.role.findMany({
		orderBy: [
			{
				roleName: 'asc',
			},
		],
	});
	return result;
};

export const getRole = async (id: string): Promise<Role> => {
	const result = await prisma.role.findUniqueOrThrow({
		where: { id: id },
	});
	return result;
};

export const deleteRole = async (id: string) => {
	const result = await prisma.role.delete({
		where: { id: id },
	});
	return result;
};
