// Assembler interpreter (part II)
// https://www.codewars.com/kata/58e61f3d8ff24f774400002c/

function assemblerInterpreter(program) {
  const stack = []
  const labels = {}
  const registers = {} 
  const memory = []
  let lt_flag = 0
  let eq_flag = 0  
  let pc = 0
  let output = ""
  let running = true

  const first_pass = () => {
    let matched
    program.split("\n").forEach(line => {
      line = line.trim()
      line = line.replace(/;.*$/, "").trim()
      if (!line) return
      if (matched = line.match(/(.*)\:$/)) {
        labels[matched[1]] = memory.length
        return
      }
      memory.push(line)
    })
  }
  
  const isRegister = s => s.match(/^\D/)
  const getValue   = s => isRegister(s) ? +registers[s] : +s
  const getAllArgs = s => {
    let args = []
    let re = /\s*('(.+?)'|([^,]+))\s*\,?/g
    while (m = re.exec(s)) {
      args.push( m[1] )
    }
    return args
  }

  const execute = instrucion => {
    let matched = instrucion.match(/(\S+)\s*(.*)$/)
    let args = getAllArgs(matched[2])
    switch (matched[1]) {
      case "mov":
        registers[args[0]] = getValue(args[1])
        break;
      case "inc":
        registers[args[0]]++
        break;
      case "dec":
        registers[args[0]]--
        break;
      case "add":
        registers[args[0]] += getValue(args[1])
        break;
      case "sub":
        registers[args[0]] -= getValue(args[1])
        break;
      case "mul":
        registers[args[0]] *= getValue(args[1])
        break;
      case "div":
        registers[args[0]] = Math.floor( registers[args[0]] / getValue(args[1]) )
        break;
      case "call":
         stack.push(pc)
         pc = labels[ args[0] ]
         break;
      case "jmp":
         pc = labels[ args[0] ]
         break;
      case "cmp":
          let value0 = getValue(args[0])
          let value1 = getValue(args[1])
          eq_flag = value0 === value1
          lt_flag = value0 < value1
        break;
      case "jne":
        if (!eq_flag) pc = labels[ args[0] ]
        break;
      case "je":
        if (eq_flag) pc = labels[ args[0] ]
        break;
      case "jge":
        if (!lt_flag) pc = labels[ args[0] ]
        break;
      case "jg":
        if (!eq_flag && !lt_flag) pc = labels[ args[0] ]
        break;
      case "jle":
        if (eq_flag || lt_flag) pc = labels[ args[0] ]
        break;
      case "jl":
        if (!eq_flag && lt_flag) pc = labels[ args[0] ]
        break;
      case "ret":
        if (!stack.length) throw(`Empty stack`)
        pc = stack.pop()
        break;
      case "msg":
        args.map( arg => {
          matched = arg.match(/^\'(.*)\'$/)
          if (matched) {
            output += matched[1]
          } else {
            output += getValue(arg)
          }
        })
        break;
      case "end":
        running = false
        break;

      default:
        break;
    }
  }

  const run = () => {
    while (running) {
      if (!memory[pc]) break
      execute(memory[pc++])
    }
    return running ? -1 : output
  }

  first_pass()
  return run()
}