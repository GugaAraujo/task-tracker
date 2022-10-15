export default interface ITarefa {
    id: number,
    duration: number,
    description: string,
    project_name?: string,
    project_id?: number,
    date?: string,
}