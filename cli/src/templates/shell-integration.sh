#!/usr/bin/env bash

# Configuration
GC_CLI_DIR="${HOME}/.gc-cli"
SUGGESTIONS_FILE="${GC_CLI_DIR}/suggestions.json"
LAST_DIFF_HASH="${GC_CLI_DIR}/last_diff_hash"

# Ensure directory exists
mkdir -p "${GC_CLI_DIR}"

# Function to generate MD5 hash of staged changes
get_diff_hash() {
    git diff --cached | md5sum | cut -d' ' -f1
}

# Function to generate suggestions in background
generate_suggestions() {
    # Get hash of current diff
    local current_hash=$(get_diff_hash)
    
    # Check if we already generated suggestions for this diff
    if [ -f "${LAST_DIFF_HASH}" ] && [ "$(cat "${LAST_DIFF_HASH}")" = "${current_hash}" ]; then
        return
    fi
    
    # Generate new suggestions in background
    (
        gc suggest --generate && \
        echo "${current_hash}" > "${LAST_DIFF_HASH}"
    ) >/dev/null 2>&1 &
}

# Function to show dimmed suggestion
show_suggestion() {
    local input="$1"
    local suggestion="$2"
    
    # Calculate how much of the suggestion to show
    local suggestion_part="${suggestion:${#input}}"
    
    if [ -n "${suggestion_part}" ]; then
        # Save cursor position
        echo -en "\033[s"
        # Show dimmed suggestion
        echo -en "\033[2m${suggestion_part}\033[0m"
        # Restore cursor position
        echo -en "\033[u"
    fi
}

# Function to get suggestions
get_suggestions() {
    local input="$1"
    if [ -f "${SUGGESTIONS_FILE}" ]; then
        local suggestions=$(cat "${SUGGESTIONS_FILE}")
        # Remove JSON formatting and filter based on input
        echo "${suggestions}" | tr -d '[]",' | grep "^${input}" 2>/dev/null
    fi
}

# Main completion function
__gc_git_completion() {
    local cmd="$1"
    local cur="$2"
    local prev="$3"
    
    case "${cmd}" in
        *"git add"*)
            generate_suggestions
            ;;
        *"git commit -m"*)
            if [ "${prev}" = "-m" ]; then
                local suggestions=$(get_suggestions "${cur}")
                if [ -n "${suggestions}" ]; then
                    local first_suggestion=$(echo "${suggestions}" | head -n1)
                    show_suggestion "${cur}" "${first_suggestion}"
                fi
            fi
            ;;
    esac
}

# Shell-specific integrations
case "$(basename "${SHELL}")" in
    "zsh")
        # ZSH integration
        autoload -Uz add-zsh-hook
        
        __gc_zsh_completion() {
            local cmd="${BUFFER}"
            local cur="${BUFFER##* }"
            local prev="${${(z)BUFFER}[-2]}"
            __gc_git_completion "${cmd}" "${cur}" "${prev}"
        }
        
        add-zsh-hook precmd __gc_zsh_completion
        ;;
        
    "bash")
        # Bash integration
        __gc_bash_completion() {
            local cmd="${COMP_WORDS[*]}"
            local cur="${COMP_WORDS[COMP_CWORD]}"
            local prev="${COMP_WORDS[COMP_CWORD-1]}"
            __gc_git_completion "${cmd}" "${cur}" "${prev}"
        }
        
        complete -F __gc_bash_completion git
        ;;
        
    "fish")
        # Fish integration
        function __gc_fish_completion --on-event fish_prompt
            set -l cmd (commandline -p)
            set -l cur (commandline -t)
            set -l prev (commandline -p | tail -n1)
            __gc_git_completion "${cmd}" "${cur}" "${prev}"
        end
        ;;
esac