export const generateID = async (workerId, processId, sequence) => {
    const timestamp = BigInt(Date.now() - 1420070400000) << 22n;
    workerId = BigInt(workerId & 0x1F) << 17n;
    processId = BigInt(processId & 0x1F) << 12n;

    return ((timestamp + workerId + processId + sequence).toString());
}