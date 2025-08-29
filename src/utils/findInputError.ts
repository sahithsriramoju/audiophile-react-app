export type InputError = { errors?: { message?: string } };

export function findInputError(
    errors: Record<string, unknown>,
    name: string
): InputError {
    const matchedKey = Object.keys(errors).find((key) => key.includes(name));
    const fieldError = matchedKey
        ? (errors as Record<string, unknown>)[matchedKey]
        : undefined;
    return { errors: fieldError as { message?: string } | undefined };
}