export interface Command {
    commandName: String
    execute(args?: String[])
}